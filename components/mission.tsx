import { Timer, Zap, ZoomIn } from "lucide-react";

const Feature16 = () => {
  return (
    <section className="py-32">
        <div className="mx-auto px-32">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          Department
        </p>
        <h2 className="text-3xl font-medium lg:text-4xl">Vision of The Department</h2>
        <div className=" lg:mt-10 ">
          <div className="rounded-lg bg-accent p-5">
            {/* <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Timer className="size-6" />
            </span> */}
            <h3 className="mb-2 text-xl font-medium">Vision</h3>
            <p className="leading-7 text-muted-foreground">
              To mould young and fresh minds into challenging computer professionals with ethical values and shaping them with upcoming technologies and develop the ability to deal with real world situations with skills and innovative ideas
            </p>
          </div>
        </div>
      {/* </div>
      <div className="mx-auto px-32"> */}
        <h2 className="text-3xl mt-5 font-medium lg:text-4xl">Mission of The Department</h2>
        <div className=" grid gap-6 lg:mt-10 lg:grid-cols-3">
          <div className="rounded-lg bg-accent p-5">
            {/* <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Timer className="size-6" />
            </span> */}
            <h3 className="mb-2 text-xl font-medium">Mission 1</h3>
            <p className="leading-7 text-muted-foreground">
              To produce competent computer professionals by providing state-of-the-art training, hands-on experience and skill for practical environment.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            {/* <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <ZoomIn className="size-6" />
            </span> */}
            <h3 className="mb-2 text-xl font-medium">Mission 2</h3>
            <p className="leading-7 text-muted-foreground">
              To impart moral, ethical values and interpersonal skills to the students.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            {/* <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Zap className="size-6" />
            </span> */}
            <h3 className="mb-2 text-xl font-medium">Mission 3</h3>
            <p className="leading-7 text-muted-foreground">
              To impart necessary technical and professional skills among the students to make them employable and eligible for higher studies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature16 };
