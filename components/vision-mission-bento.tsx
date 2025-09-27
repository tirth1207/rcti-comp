"use client"

interface Feature {
  title: string;
  description: string;
  // image: string;
}

interface Feature166Props {
  heading: string;
  description?: string;
  feature1: Feature;
  feature2: Feature;
  feature3: Feature;
  feature4: Feature;
}

const Bento = ({
  heading = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  feature1 = {
    title: "UI/UX Design",
    description:
      "Creating intuitive user experiences with modern interface design principles and user-centered methodologies.",
    // image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  feature2 = {
    title: "Responsive Development",
    description:
      "Building websites that look and function perfectly across all devices and screen sizes.",
    // image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  feature3 = {
    title: "Brand Integration",
    description:
      "Seamlessly incorporating your brand identity into every aspect of your website's design.",
    // image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  feature4 = {
    title: "Performance Optimization",
    description:
      "Ensuring fast loading times and smooth performance through optimized code and assets.",
    // image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
}: Feature166Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="mb-24 flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-semibold lg:max-w-3xl lg:text-5xl">
            {heading}
          </h1>
          <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
            {description}
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="border-muted2 relative flex w-full flex-col border md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-3/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold">{feature1.title}</h2>
                <p className="text-muted-foreground">{feature1.description}</p>
                {/* <img
                  src={feature1.image}
                  alt={feature1.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                /> */}
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-2/5">
                <h2 className="text-xl font-semibold">{feature2.title}</h2>
                <p className="text-muted-foreground">{feature2.description}</p>
                {/* <img
                  src={feature2.image}
                  alt={feature2.title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover"
                /> */}
              </div>
            </div>
            <div className="border-muted2 relative flex flex-col border-t border-solid lg:flex-row">
              <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold">{feature3.title}</h2>
                <p className="text-muted-foreground">{feature3.description}</p>
                {/* <img
                  src={feature3.image}
                  alt={feature3.title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover"
                /> */}
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-3/5">
                <h2 className="text-xl font-semibold">{feature4.title}</h2>
                <p className="text-muted-foreground">{feature4.description}</p>
                {/* <img
                  src={feature4.image}
                  alt={feature4.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// import { Bento } from "@/components/bento"

const content = {
  instituteVision:
    "To cater to the technological development of the nation through excellence in technical education by satisfying needs of the industries & society.",
  instituteMission: [
    "To impart qualitative technical education to the students and inculcating core values in them through optimum utilization and mobilization of institute’s resources to enhance their employability.",
    "To strengthen linkage with industry, networking with other institutions and organizations by providing various services and conducting demand driven continuing education and community programmes.",
    "To strive for becoming a centre of excellence enabling to face the ever changing and challenging technological environment.",
  ],
  deptVision:
    "To mould young and fresh minds into challenging computer professionals with ethical values and shaping them with upcoming technologies and develop the ability to deal with real world situations with skills and innovative ideas",
  deptMission: [
    "To produce competent computer professionals by providing state-of-the-art training, hands-on experience and skill for practical environment.",
    "To impart moral, ethical values and interpersonal skills to the students.",
    "To impart necessary technical and professional skills among the students to make them employable and eligible for higher studies.",
  ],
}

export function VisionMissionBento() {
  return (
    <section aria-labelledby="vision-mission">
      <Bento
        heading="Our Vision & Mission"
        description="Guiding principles that shape our institute and department."
        feature1={{
          title: "Institute Vision",
          description: content.instituteVision,
          // image: "/campus-vision-illustration.jpg",
        }}
        feature2={{
          title: "Institute Mission",
          description: content.instituteMission.map((m) => `• ${m}`).join(" "),
          // image: "/mission-and-values-illustration.jpg",
        }}
        feature3={{
          title: "Department Vision",
          description: content.deptVision,
          // image: "/department-vision-illustration.jpg",
        }}
        feature4={{
          title: "Department Mission",
          description: content.deptMission.map((m) => `• ${m}`).join(" "),
          // image: "/student-success-illustration.jpg",
        }}
      />
    </section>
  )
}

export { Bento };
