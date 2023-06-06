'use client';

import LoginUser from '@/components/auth/LoginUser/LoginUser';

const Landing = () => (
  <main className="min-h-screen p-12">
    <div>Landing</div>
    <div className=" flex items-center justify-center mt-5 md:absolute top-3 right-3 space-x-6 p-3   border  border-primary rounded  max-w-3xl ">
      <h2 className="">Already have an account?</h2>
      <LoginUser />
    </div>
  </main>
);

export default Landing;
