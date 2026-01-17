function Card({ data }) {
  const { name, role } = data;
  
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

export default function App() {
  const user = { name: "Sarah", role: "Engineer" };
  return (
    <div className="app-container">
      <Card data={user} />
    </div>
  );
}

