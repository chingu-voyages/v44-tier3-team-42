import CreateJournal from '@/components/dashboard/CreateJournal';
import Journals from '@/components/dashboard/Journals';
import Dropdown from '@/components/dropdown';

const Dashboard = () => (
  <main className="min-h-screen p-12">
    <div className="absolute top-5 right-7 pb-5">
      <Dropdown />
    </div>

    <div className="flex items-center justify-between max-w-3xl mx-auto">
      <h1>Dashboard</h1>

      <CreateJournal />
    </div>
    <Journals />
  </main>
);

export default Dashboard;
