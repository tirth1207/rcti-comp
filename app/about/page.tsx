import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, BookOpen, Users, TrendingUp, Award, MapPin, Calendar, GraduationCap, Building2, Lightbulb, Trophy, Star, ChevronRight } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { number: "25+", label: "Years of Excellence", icon: Calendar },
    { number: "5000+", label: "Alumni Network", icon: GraduationCap },
    { number: "50+", label: "Expert Faculty", icon: Users },
    { number: "95%", label: "Placement Rate", icon: Trophy }
  ];

  const facilities = [
    {
      title: "Advanced Computer Labs",
      description: "State-of-the-art computing facilities with latest hardware",
      icon: BookOpen,
      color: "blue"
    },
    {
      title: "Research Centers",
      description: "Innovation hubs for cutting-edge research projects",
      icon: Lightbulb,
      color: "purple"
    },
    {
      title: "Industry Partnerships",
      description: "Strong connections with leading tech companies",
      icon: Building2,
      color: "green"
    },
    {
      title: "Project Labs",
      description: "Collaborative spaces for hands-on learning",
      icon: Users,
      color: "orange"
    }
  ];

  const programs = [
    { name: "Computer Engineering", duration: "4 Years", intake: "120" },
    { name: "Information Technology", duration: "4 Years", intake: "60" },
    { name: "Electronics & Communication", duration: "4 Years", intake: "60" },
    { name: "Artificial Intelligence & ML", duration: "4 Years", intake: "60" }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/></%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-6">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <MapPin className="w-3 h-3 mr-1" />
                Ahmedabad, Gujarat
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              RC Technical Institute
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light">
              Empowering Future Engineers with Excellence in Technical Education Since 1998
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                AICTE Approved
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                GTU Affiliated
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                NBA Accredited
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.05),transparent)]" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-6 bg-blue-50 text-blue-700 border-blue-200">
                <Sparkles className="w-3 h-3 mr-1" />
                About RC Technical Institute
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Pioneering Technical Education in Gujarat
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Established in 1998, RC Technical Institute has been at the forefront of technical education 
                  in Ahmedabad, Gujarat. We are committed to nurturing the next generation of engineers and 
                  technologists who will shape the future of India.
                </p>
                <p>
                  Our institute combines theoretical knowledge with practical application, ensuring our students 
                  are industry-ready from day one. With state-of-the-art facilities and experienced faculty, 
                  we provide an environment that fosters innovation, creativity, and academic excellence.
                </p>
                <p>
                  Located in the heart of Ahmedabad, we serve as a bridge between academic learning and 
                  industry requirements, maintaining strong partnerships with leading companies and research 
                  organizations.
                </p>
              </div>
              <div className="mt-8 flex items-center text-blue-600 font-semibold">
                <span>Discover Our Programs</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-10 blur-xl" />
              <Card className="relative overflow-hidden border-0 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop"
                  alt="RC Technical Institute Campus"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Modern Campus</h3>
                  <p className="text-white/90">Innovation meets tradition in our inspiring environment</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
              <GraduationCap className="w-3 h-3 mr-1" />
              Academic Programs
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Undergraduate Engineering Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of engineering disciplines designed to meet 
              industry demands and emerging technology trends.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{program.name}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">{program.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intake:</span>
                    <span className="font-semibold">{program.intake} Students</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-blue-600 font-medium text-sm">
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(139,69,19,0.05),transparent)]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-green-50 text-green-700 border-green-200">
              <Building2 className="w-3 h-3 mr-1" />
              World-Class Facilities
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Infrastructure That Inspires Innovation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our campus features cutting-edge facilities designed to provide students with 
              hands-on experience and research opportunities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-gray-100">
                <div className={`w-16 h-16 bg-${facility.color}-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <facility.icon className={`w-8 h-8 text-${facility.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/></%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>
              <p className="text-xl text-blue-100 leading-relaxed">
                To be a globally recognized center of excellence in technical education, 
                fostering innovation, research, and entrepreneurship while producing 
                world-class engineers who contribute to society's betterment.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              <p className="text-xl text-blue-100 leading-relaxed">
                To provide quality technical education through innovative teaching methodologies, 
                state-of-the-art infrastructure, and industry collaboration, while nurturing 
                ethical values and leadership qualities in our students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Engineering Journey?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join RC Technical Institute and become part of a legacy of excellence in technical education.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg">
              Apply Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300">
              Schedule Campus Tour
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}