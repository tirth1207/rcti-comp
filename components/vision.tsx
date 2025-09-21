import { ArrowRight } from "lucide-react";

const Feature74 = () => {
  return (
    <section className="py-20">
      <div className="mx-auto flex flex-col gap-16 lg:px-16">
        <div className="lg:max-w-3xl">
          <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            About RCTI
          </h2>
          <p className="mb-8 text-muted-foreground lg:text-lg">
            Welcome to R.C. Technical Institute, Ahmedabad.
Founded in 1910 by Rao Bahadoor Ranchhodlal Chhotalal, the institute began with certificate courses in Mechanical, Electrical, and Textile fields. In 1947, these evolved into diploma programmes, and over time new courses like Printing, Mechanical, Electrical, Computer, IT, and Civil Engineering were introduced. To support this growth, the institute moved to its current eco-friendly Sola campus in 1997.
          </p>
          <a
            href="#"
            className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
          >
            Read More{" "}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          <div className="flex flex-col overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="Feature 1"
                className="aspect-16/9 h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                Vision Of The Institute
              </h3>
              <ul className="list-disc pl-5 text-muted-foreground lg:text-lg">
                <li>
                  To cater to the technological development of the nation through excellence in technical education by satisfying needs of the industries & society.
                </li>
              </ul>
              <h3 className="mt-6 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                Vision Of The Department
              </h3>
              <ul className="list-disc pl-5 text-muted-foreground lg:text-lg">
                <li>
                 To mould young and fresh minds into challenging computer professionals with ethical values and shaping them with upcoming technologies and develop the ability to deal with real world situations with skills and innovative ideas
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col-reverse overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                Mission Of The Institute
              </h3>
              <ul className="list-disc pl-5 text-muted-foreground lg:text-lg">
                <li>
                  To impart qualitative technical education to the students and inculcating core values in them through optimum utilization and mobilization of institute’s resources to enhance their employability.
                </li>
                <li>
                  To strengthen linkage with industry, networking with other institutions and organizations by providing various services and conducting demand driven continuing education and community programmes.
                </li>
                <li>
                  To strive for becoming a centre of excellence enabling to face the ever changing and challenging technological environment.
                </li>
              </ul>
              <h3 className="mt-6 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                Mission Of The Department
              </h3>
              <ul className="list-disc pl-5 text-muted-foreground lg:text-lg">
                <li>
                  To produce competent computer professionals by providing state-of-the-art training, hands-on experience and skill for practical environment.
                </li>
                <li>
                  To impart moral, ethical values and interpersonal skills to the students.
                </li>
                <li>
                  To impart necessary technical and professional skills among the students to make them employable and eligible for higher studies.
                </li>
              </ul>
            </div>
            <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                alt="Feature 2"
                className="aspect-16/9 h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature74 };
