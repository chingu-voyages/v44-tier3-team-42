
import Logout from '@/components/auth/LogoutUser';
import CreateJournal from '@/components/dashboard/CreateJournal';
import Journals from '@/components/dashboard/Journals';


const Dashboard = () => (
  <main className="min-h-screen p-12">
    <div className="flex items-center justify-between max-w-3xl mx-auto">
      <h1>Dashboard</h1>
      <Logout/>
      <CreateJournal />
    </div>
    <Journals />
  </main>
);

export default Dashboard;
