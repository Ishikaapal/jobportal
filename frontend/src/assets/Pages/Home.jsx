import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../../sidebar/Sidebar";
import Newsletter from "../../components/Newsletter";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:3000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch jobs", error);
        setIsLoading(false);
      });
  }, []);

  // Handle input search change
  const handleInputChange = (e) => setQuery(e.target.value);

  // Handle category filter (radio/buttons)
  const handleChange = (e) => setSelectedCategory(e.target.value);
  const handleClick = (e) => setSelectedCategory(e.target.value);

  // Step 1: Filter based on search query
  const filteredByQuery = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(query.toLowerCase())
  );

  // Step 2: Apply category filters
  const filteredJobs = selectedCategory
    ? filteredByQuery.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selectedCategory) ||
          postingDate >= selectedCategory ||
          salaryType.toLowerCase() === selectedCategory.toLowerCase() ||
          experienceLevel.toLowerCase() === selectedCategory.toLowerCase() ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase()
      )
    : filteredByQuery;

  // Step 3: Pagination slicing
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  // Step 4: Render cards for paginated jobs
  const result = paginatedJobs.map((job, i) => <Card key={i} data={job} />);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* Sidebar */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* Main Job Listing */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : filteredJobs.length > 0 ? (
            <>
              <Jobs result={result} />
              {/* Pagination */}
              <div className="flex justify-center mt-4 space-x-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="hover:underline font-bold"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < totalPages ? prev + 1 : prev
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="hover:underline font-bold"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">0 Jobs</h3>
              <p>No Data Found!</p>
            </>
          )}
        </div>

        {/* Newsletter */}
        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
