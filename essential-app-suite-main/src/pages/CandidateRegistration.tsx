import React, { useState } from 'react';

const CandidateRegistration: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', skills: '' });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('skills', formData.skills);
    if (file) {
      data.append('resume', file);
    }

    try {
      const res = await fetch('http://localhost:5000/api/register-candidate', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      alert(result.message);
    } catch (error) {
      alert("Error: Backend server is not running!");
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '40px auto', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: '20px' }}>Upload Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Full Name</label>
          <input 
            type="text" 
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email Address</label>
          <input 
            type="email" 
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Skills</label>
          <textarea 
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            onChange={(e) => setFormData({...formData, skills: e.target.value})} 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Resume (PDF Only)</label>
          <input 
            type="file" 
            accept=".pdf" 
            style={{ width: '100%', padding: '10px' }}
            onChange={(e) => {
              const files = e.target.files;
              if (files) setFile(files[0]);
            }} 
            required 
          />
        </div>
        <button 
          type="submit" 
          style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default CandidateRegistration;