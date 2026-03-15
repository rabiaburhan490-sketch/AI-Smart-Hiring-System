import { useEffect, useState } from "react";

const Index = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Backend se data mangwana
    fetch("http://localhost:5000/api/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Admin Dashboard - Candidate List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Skills</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Resume</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c: any) => (
            <tr key={c.id}>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{c.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{c.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{c.skills}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                <a href={`http://localhost:5000/${c.resume_path}`} target="_blank" style={{ color: 'blue' }}>View CV</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;