import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
  } = data;

  return (
    <section className="card">
      <Link to={`/job/${_id}`} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start w-full">
        <div>
          <img src={companyLogo} alt={companyName} className="rounded-full w-24 h-24 object-cover" />
        </div>

        <div className="col-span-2">
          <h4 className="text-primary mb-1">
            <span className="font-bold">Posted By:</span> {companyName}
          </h4>
          <h3 className="text-lg font-semibold mb-2">
            <span className="font-bold">Title:</span> {jobTitle}
          </h3>

          <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-2"><FiMapPin /> {jobLocation}</span>
            <span className="flex items-center gap-2"><FiClock /> {employmentType}</span>
            <span className="flex items-center gap-2"><FiDollarSign /> {minPrice}-{maxPrice} {salaryType}</span>
            <span className="flex items-center gap-2"><FiCalendar /> {postingDate}</span>
          </div>

          <p className="text-base text-primary/70">
            <span className="font-bold">Job Description:</span> {description}
          </p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
