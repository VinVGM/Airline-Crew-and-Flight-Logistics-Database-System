import Search from "@/app/ui/search";
import CrewsTable from "@/app/ui/crews/table";
import { CreateCrew } from "@/app/ui/crews/buttons";

export default function Page() {
    return (
        <div>
            <div className='flex items-center justify-between gap-2 mt-4 md:mt-8'>
                <Search placeholder='Search Crew'/>
            </div>
            <CrewsTable />
        </div>
    );
}