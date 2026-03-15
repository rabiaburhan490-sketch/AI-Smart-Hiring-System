import { useState, useEffect } from 'react';

const Index = () => {
  const [formData, setFormData] = useState({ name: '', email: '', skills: '' });
  const [file, setFile] = useState<File | null>(null);
  const [candidates, setCandidates] = useState([]);

  // 1. Database se list mangwana
  const fetchCandidates = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/candidates');
      const data = await res.json();
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // 2. Form Submit handle karna
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('skills', formData.skills);
    if (file) data.append('resume', file);

    try {
      const res = await fetch('http://localhost:5000/api/register-candidate', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      alert(result.message);
      fetchCandidates(); // Upload ke baad list refresh ho jaye
    } catch (error) {
      alert("Error: Server (server.js) nahi chal raha!");
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-10">
      {/* --- FORM SECTION --- */}
      <div className="bg-white shadow-lg rounded-lg p-8 border">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Upload Your Resume</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="p-3 border rounded" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input type="email" placeholder="Email Address" className="p-3 border rounded" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <textarea placeholder="Skills (React, Python...)" className="w-full p-3 border rounded" 
            onChange={(e) => setFormData({...formData, skills: e.target.value})} />
          <input type="file" accept=".pdf" className="w-full p-2 border border-dashed border-blue-400" 
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} required />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-bold">Submit & Upload</button>
        </form>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white shadow-lg rounded-lg p-8 border">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Registered Candidates</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Resume</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c: any) => (
              <tr key={c.id} className="border-b">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">
                  <a href={`http://localhost:5000/${c.resume_path}`} target="_blank" className="text-blue-500 underline">View PDF</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;