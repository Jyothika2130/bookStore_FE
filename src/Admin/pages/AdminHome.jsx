import React from "react";
import AdminHeader from "../Components/AdminHeader";
import AdminSidebar from "../Components/AdminSideBar";
import { Card } from "flowbite-react";

const AdminHome = () => {
  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div>
          <div className="flex justify-between  mt-3">
            <div>
              <Card href="#" className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Total Books
                </h5>
              </Card>
            </div>

            <div>
              <Card href="#" className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Total Users
                </h5>
              </Card>
            </div>

            <div>
              <Card href="#" className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Total Job Openings
                </h5>
              </Card>
            </div>
          </div>
          <div className="mt-5">
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Applications
              </h5>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;