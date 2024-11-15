import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface VacancyData {
  id: string;
  logoUrl: string;
  companyName: string;
  position: string;
  isNew: boolean;
  isFeatured: boolean;
  jobType: string;
  workType: string;
  location: string;
  skills: string[];
}

const App: React.FC = () => {
  const [vacancies, setVacancies] = useState<VacancyData[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VacancyData>();

  useEffect(() => {
    const storedVacancies = localStorage.getItem("vacancies");
    if (storedVacancies) {
      try {
        const parsedVacancies = JSON.parse(storedVacancies);
        setVacancies(Array.isArray(parsedVacancies) ? parsedVacancies : []);
      } catch (error) {
        console.error("Error parsing vacancies from localStorage:", error);
        setVacancies([]);
      }
    }
  }, []);

  const onSubmit: SubmitHandler<VacancyData> = (data) => {
    const newVacancy = {
      ...data,
      id: Date.now().toString(),
      skills: Array.isArray(data.skills)
        ? data.skills
        : [data.skills].filter(Boolean),
    };
    const updatedVacancies = [...vacancies, newVacancy];
    setVacancies(updatedVacancies);
    localStorage.setItem("vacancies", JSON.stringify(updatedVacancies));
    setIsFormVisible(false);
    reset();
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const deleteVacancy = (id: string) => {
    const updatedVacancies = vacancies.filter((vacancy) => vacancy.id !== id);
    setVacancies(updatedVacancies);
    localStorage.setItem("vacancies", JSON.stringify(updatedVacancies));
  };

  return (
    <div className="container mx-auto p-4">
      {isFormVisible ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <h2 className="text-2xl font-bold mb-4">
            Vakansiya ma'lumotlarini kiriting
          </h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="logoUrl"
            >
              Logotip URL
            </label>
            <input
              {...register("logoUrl", {
                required: "Logotip URL kiritish shart",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="logoUrl"
              type="text"
              placeholder="Logotip URL manzilini kiriting"
            />
            {errors.logoUrl && (
              <p className="text-red-500 text-xs italic">
                {errors.logoUrl.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="companyName"
            >
              Kompaniya nomi
            </label>
            <input
              {...register("companyName", {
                required: "Kompaniya nomini kiritish shart",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="companyName"
              type="text"
              placeholder="Kompaniya nomini kiriting"
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs italic">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="position"
            >
              Lavozim
            </label>
            <input
              {...register("position", {
                required: "Lavozimni kiritish shart",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="position"
              type="text"
              placeholder="Lavozimni kiriting"
            />
            {errors.position && (
              <p className="text-red-500 text-xs italic">
                {errors.position.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register("isNew")}
                className="form-checkbox"
              />
              <span className="ml-2">Yangi</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="checkbox"
                {...register("isFeatured")}
                className="form-checkbox"
              />
              <span className="ml-2">Featured</span>
            </label>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="jobType"
            >
              Vaqt
            </label>
            <select
              {...register("jobType", { required: "Vaqtni tanlash shart" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="jobType"
            >
              <option value="">Tanlang</option>
              <option value="1d ago">1d ago</option>
              <option value="2d ago">2d ago</option>
              <option value="3d ago">3d ago</option>
              <option value="4d ago">4d ago</option>
              <option value="1w ago">1w ago</option>
              <option value="2w ago">2w ago</option>
              <option value="3w ago">3w ago</option>
              <option value="4w ago">4w ago</option>
            </select>
            {errors.jobType && (
              <p className="text-red-500 text-xs italic">
                {errors.jobType.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="workType"
            >
              Ish turi
            </label>
            <select
              {...register("workType", {
                required: "Ish turini tanlash shart",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="workType"
            >
              <option value="">Tanlang</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.workType && (
              <p className="text-red-500 text-xs italic">
                {errors.workType.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Joylashuv
            </label>
            <select
              {...register("location", {
                required: "Joylashuvni tanlash shart",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
            >
              <option value="">Tanlang</option>
              <option value="USA only">USA only</option>
              <option value="Remote">Remote</option>
              <option value="UK only">UK only</option>
              <option value="Worldwide">Worldwide</option>
            </select>
            {errors.location && (
              <p className="text-red-500 text-xs italic">
                {errors.location.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ko'nikmalar
            </label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Fullstack"
                  className="form-checkbox"
                />
                <span className="ml-2">Fullstack</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Frontend"
                  className="form-checkbox"
                />
                <span className="ml-2">Frontend</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Backend"
                  className="form-checkbox"
                />
                <span className="ml-2">Backend</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Python"
                  className="form-checkbox"
                />
                <span className="ml-2">Python</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Junior"
                  className="form-checkbox"
                />
                <span className="ml-2">Junior</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="React"
                  className="form-checkbox"
                />
                <span className="ml-2">React</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="Sass"
                  className="form-checkbox"
                />
                <span className="ml-2">Sass</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  {...register("skills")}
                  value="JavaScript"
                  className="form-checkbox"
                />
                <span className="ml-2">JavaScript</span>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Saqlash
            </button>
            {submitSuccess && (
              <p className="text-green-500 mt-2">
                Vakansiya muvaffaqiyatli saqlandi!
              </p>
            )}
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          Yangi vakansiya qo'shish
        </button>
      )}

      {vacancies.length > 0 ? (
        <div className="grid gap-4">
          {vacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              className="bg-white shadow-lg rounded-lg p-6 flex items-center"
            >
              <img
                src={vacancy.logoUrl}
                alt={vacancy.companyName}
                className="w-20 h-20 rounded-full mr-6"
              />
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold mr-4">
                    {vacancy.companyName}
                  </h3>
                  {vacancy.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs mr-2">
                      NEW
                    </span>
                  )}
                  {vacancy.isFeatured && (
                    <span className="bg-black text-white px-2 py-1 rounded-full text-xs">
                      FEATURED
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  {vacancy.position}
                </h4>
                <div className="text-gray-600">
                  <span>{vacancy.jobType}</span> •{" "}
                  <span>{vacancy.workType}</span> •{" "}
                  <span>{vacancy.location}</span>
                </div>
                <div className="mt-2">
                  {vacancy.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => deleteVacancy(vacancy.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                O'chirish
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Hozircha vakansiyalar yo'q.</p>
      )}
    </div>
  );
};

export default App;
