import CreateWeddingFlow from './CreateWeddingFlow';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-600">Create and manage your wedding invitation.</p>
      </div>
      
      <CreateWeddingFlow />
    </div>
  );
}
