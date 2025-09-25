import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Sparkles,
  BookOpen,
  Users,
  Award,
  MapPin,
  Calendar,
  GraduationCap,
  Building2,
  Lightbulb,
  Trophy,
  Star,
  ChevronRight,
} from "lucide-react"

export default function AboutPage() {
  const facilities = [
    {
      title: "Advanced Computer Labs",
      description: "State-of-the-art computing facilities with latest hardware",
      icon: BookOpen,
      color: "blue",
    },
    {
      title: "Research Centers",
      description: "Innovation hubs for cutting-edge research projects",
      icon: Lightbulb,
      color: "purple",
    },
    {
      title: "Industry Partnerships",
      description: "Strong connections with leading tech companies",
      icon: Building2,
      color: "green",
    },
    {
      title: "Project Labs",
      description: "Collaborative spaces for hands-on learning",
      icon: Users,
      color: "orange",
    },
  ]

  // Helper for facility color classes
  const facilityColor = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      {/* About & Facilities Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.07),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            {/* About */}
            <div className="flex-1 max-w-xl">
              <Badge
                variant="secondary"
                className="mb-4 bg-blue-50 text-blue-700 border-blue-200 px-3 py-1.5 text-sm font-medium flex items-center gap-2 w-fit"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                About RC Technical Institute
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Pioneering Technical Education in Gujarat
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-base">
                <p>
                  Established in 1998, RC Technical Institute has been at the forefront of technical education in Ahmedabad, Gujarat. We are committed to nurturing the next generation of engineers and technologists with a focus on innovation, research, and holistic development.
                </p>
                <p>
                  Our dedicated faculty and state-of-the-art infrastructure ensure that students receive the best possible education and hands-on experience.
                </p>
              </div>
            </div>
            {/* Facilities */}
            <div className="flex-1 w-full">
              <Badge
                variant="secondary"
                className="mb-3 bg-green-50 text-green-700 border-green-200 px-3 py-1.5 text-sm font-medium flex items-center gap-2 w-fit"
              >
                <Building2 className="w-4 h-4 mr-1" />
                World-Class Facilities
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                Infrastructure That Inspires Innovation
              </h2>
              <p className="text-base text-gray-600 mb-6">
                Our campus features cutting-edge facilities designed to provide students with hands-on experience and research opportunities.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facilities.map((facility, index) => (
                  <Card
                    key={index}
                    className={`p-5 text-center hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 bg-white border-0 rounded-xl`}
                  >
                    <div
                      className={`w-16 h-16 ${facilityColor[facility.color as keyof typeof facilityColor].bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow`}
                    >
                      <facility.icon className={`w-8 h-8 ${facilityColor[facility.color as keyof typeof facilityColor].text}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.title}</h3>
                    <p className="text-gray-600 text-base">{facility.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Outcomes Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Vision of the Institute</h3>
              </div>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                To cater to the technological development of the nation through excellence in technical education by satisfying needs of the industries & society.
              </p>
              <div className="flex items-center mb-6 mt-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Mission of the Institute</h3>
              </div>
              <ul className="list-disc ml-8 text-blue-100 space-y-3 text-lg">
                <li>To impart qualitative technical education to the students and inculcating core values in them through optimum utilization and mobilization of institute’s resources to enhance their employability.</li>
                <li>To strengthen linkage with industry, networking with other institutions and organizations by providing various services and conducting demand driven continuing education and community programmes.</li>
                <li>To strive for becoming a centre of excellence enabling to face the ever changing and challenging technological environment.</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Vision of the Department</h3>
              </div>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                To mould young and fresh minds into challenging computer professionals with ethical values and shaping them with upcoming technologies and develop the ability to deal with real world situations with skills and innovative ideas
              </p>
              <div className="flex items-center mb-6 mt-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Mission of the Department</h3>
              </div>
              <ul className="list-disc ml-8 text-blue-100 space-y-3 text-lg">
                <li>To produce competent computer professionals by providing state-of-the-art training, hands-on experience and skill for practical environment.</li>
                <li>To impart moral, ethical values and interpersonal skills to the students.</li>
                <li>To impart necessary technical and professional skills among the students to make them employable and eligible for higher studies.</li>
              </ul>
            </div>
          </div>

          {/* Program Educational Objectives (PEOs) */}
          <div>
            <h3 className="text-3xl font-bold mb-6">Program Educational Objectives (PEOs)</h3>
            <ul className="list-disc ml-8 text-blue-100 space-y-3 text-lg">
              <li>To solve real-life problems through the use of technical knowledge with attention to Team work, Effective Communication, Critical Thinking and Problem Solving skills.</li>
              <li>To demonstrate the ability to adapt to a dynamically changing technological environment by learning and applying new skills and technologies with ethical and legal responsibilities to the society as a whole.</li>
              <li>To make the students prepare for pursuing higher studies.</li>
            </ul>
          </div>

          {/* Program Specific Outcomes (PSOs) */}
          <div>
            <h3 className="text-3xl font-bold mb-6">Program Specific Outcomes (PSOs)</h3>
            <ul className="list-disc ml-8 text-blue-100 space-y-3 text-lg">
              <li>Ability to identify domains in real-world scenarios to implement computing knowledge & skills for providing innovative and effective software & hardware based solutions.</li>
              <li>Ability to advance with the evolutionary changes in technology that helps in successful job career, entrepreneurship and higher studies.</li>
              <li>Ability to understand, analyze and develop computer programs related to algorithm, system software, database, web design and networking.</li>
            </ul>
          </div>

          {/* Program Outcomes (POs) */}
          <div>
            <h3 className="text-3xl font-bold mb-6">Program Outcomes (POs)</h3>
            <ul className="list-disc ml-8 text-blue-100 space-y-3 text-lg">
              <li>Basic and Discipline specific knowledge</li>
              <li>Problem analysis</li>
              <li>Design/ development of solutions</li>
              <li>Engineering Tools, Experimentation and Testing</li>
              <li>Engineering practices for society, sustainability and environment</li>
              <li>Project Management</li>
              <li>Life-long learning</li>
            </ul>
          </div>
        </div>
        {/* Decorative shapes */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      


    </main>
  )
}
