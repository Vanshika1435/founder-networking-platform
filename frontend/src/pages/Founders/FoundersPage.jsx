import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import SearchBar from "../../components/ui/SearchBar";
import EmptyState from "../../components/ui/EmptyState";

import FounderCard from "../../components/founders/FounderCard";
import FounderModal from "../../components/founders/FounderModal";
import StatCard from "../../components/dashboard/StatCard";

import {
  Users,
  Building2,
  Briefcase,
  MapPin,
} from "lucide-react";

import {
  getFounders,
  searchFounders,
} from "../../services/founderService";

function FoundersPage() {

  const [founders, setFounders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedFounder, setSelectedFounder] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadFounders();
  }, []);

  useEffect(() => {

    const timer = setTimeout(() => {

      if (search.trim() === "") {

        loadFounders();

      }

      else {

        searchFounder();

      }

    }, 400);

    return () => clearTimeout(timer);

  }, [search]);

  const loadFounders = async () => {

    try {

      const data = await getFounders();

      setFounders(data);

    }

    finally {

      setLoading(false);

    }

  };

  const searchFounder = async () => {
    try {
      const data = await searchFounders({
        name: search,
        company: search,
        industry: search,
        city: search,
      });

      setFounders(data);
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) {

    return <Loader />;

  }

  return (

    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <StatCard
        title="Total Founders"
        value={founders.length}
        icon={<Users size={22}/>}
        color="#4F46E5"
        />

        <StatCard
        title="Companies"
        value={new Set(founders.map(f=>f.company_name)).size}
        icon={<Building2 size={22}/>}
        color="#16A34A"
        />

        <StatCard
        title="Industries"
        value={new Set(founders.map(f=>f.industry)).size}
        icon={<Briefcase size={22}/>}
        color="#F97316"
        />

        <StatCard
        title="Cities"
        value={new Set(founders.map(f=>f.city)).size}
        icon={<MapPin size={22}/>}
        color="#9333EA"
        />

      </div>
      <Card title="Founder Directory">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="text-slate-500 font-medium flex items-center">

            Total Founders :

            <span className="ml-2 text-indigo-600 font-bold">

              {founders.length}

            </span>

          </div>

        </div>

        {

          founders.length === 0 ?

            (

              <EmptyState

                text="No Founders Found"

              />

            )

            :

            (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {

                  founders.map((founder) => (

                    <FounderCard

                      key={founder.id}

                      founder={founder}

                      onView={(item) => {

                        setSelectedFounder(item);

                        setOpen(true);

                      }}

                    />

                  ))

                }

              </div>

            )

        }

      </Card>

      <FounderModal

        founder={selectedFounder}

        open={open}

        onClose={() => {

          setOpen(false);

          setSelectedFounder(null);

        }}

      />

    </>

  );

}

export default FoundersPage;