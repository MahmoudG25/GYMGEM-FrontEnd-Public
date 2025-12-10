import CoursesData from "../../js/TrainersData";
import { Link } from "react-router-dom";

function CardForTrainers() {
  return (
    <section className="w-full bg-background pb-20">
      <div className="mx-auto grid w-[80%] gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {CoursesData.map((item) => (
          <article
            key={item.id ?? item.title}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                src={item.image}
                alt={item.title}
              />
            </div>

            <div className="flex flex-1 flex-col gap-6 p-6">
              <div className="space-y-3">
                <h3 className="font-bebas text-2xl uppercase text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.ByCoach}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between">
                <span className="font-bebas text-xl text-foreground">{item.price}</span>
                <Link
                  to="/viewprofile"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-[#ff8211] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e97108] hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CardForTrainers;
