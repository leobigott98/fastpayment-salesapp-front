import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

function Page() {
    return(
        <div>
            this is a page
        </div>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;