import React, { useState, useEffect } from "react";
import {
  Music,
  Code,
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  Award,
  FileText,
  X,
  ChevronDown,
} from "lucide-react";

const Alert = ({ children, onClose }) => (
  <div className="fixed top-4 right-4 bg-blue-100 border border-blue-600 text-blue-800 p-4 rounded-lg shadow-lg z-50 animate-fade-in">
    <div className="flex items-center justify-between">
      <span>{children}</span>
      <button onClick={onClose} className="mr-2">
        <X className="h-4 w-4" />
      </button>
    </div>
  </div>
);

const ProjectCard = ({
  title,
  description,
  icon: Icon,
  category,
  date,
  technologies = [],
  grade,
  additionalDetails = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [touchTimer, setTouchTimer] = useState(null);
  const [isHolding, setIsHolding] = useState(false);

  const handleTouchStart = () => {
    if (window.innerWidth <= 768) {
      setIsHolding(true);
      const timer = setTimeout(() => {
        setIsExpanded(true);
        setIsHolding(false);
      }, 1500);
      setTouchTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (touchTimer) {
      clearTimeout(touchTimer);
      setTouchTimer(null);
    }
    setIsHolding(false);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  return (
    <div
      className="relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onClick={() => window.innerWidth > 768 && setIsExpanded(true)}
    >
      {isHolding && (
        <div className="absolute inset-0 bg-black bg-opacity-10 rounded-2xl flex items-center justify-center z-10">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Icon className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="bg-blue-50 p-3 rounded-full">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        {grade && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
            {grade}
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-blue-600 font-medium mb-3">{category}</p>
      <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

      <div className="flex items-center space-x-3 text-sm text-gray-500">
        <Calendar className="h-4 w-4" />
        <span>{date}</span>
      </div>

      <div className="md:hidden mt-4 text-center">
        <div className="text-xs text-blue-600 font-medium flex items-center justify-center">
          <span className="inline-block w-3 h-3 bg-blue-100 rounded-full mr-1 animate-pulse"></span>
          לחץ ארוך לפרטים נוספים
        </div>
      </div>

      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Icon className="h-10 w-10 text-blue-600" />
              </div>

              <h3 className="text-3xl font-bold text-center text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-lg text-blue-600 font-medium mb-4">
                {category}
              </p>

              {grade && (
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-lg font-bold mb-4">
                  ציון: {grade}
                </div>
              )}

              <p className="text-gray-700 mb-6 text-center">{description}</p>

              {technologies.length > 0 && (
                <div className="w-full bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-gray-900 mb-3 text-right">
                    טכנולוגיות ששימשו:
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {additionalDetails.length > 0 && (
                <div className="w-full bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-gray-900 mb-3 text-right">
                    פרטים נוספים:
                  </h4>
                  <ul className="space-y-2">
                    {additionalDetails.map((detail, index) => (
                      <li
                        key={index}
                        className="text-gray-700 flex items-start justify-end"
                      >
                        <span className="text-right">{detail}</span>
                        <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 ml-2"></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center space-x-3 text-gray-600 mt-4">
                <span>{date}</span>
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BagrutHomepage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: "מערכת ניהול מוזיקה",
      description:
        "מערכת מקיפה לניהול אוסף מוזיקה דיגיטלי עם אפשרויות סינון, חיפוש והמלצות מותאמות אישית",
      icon: Music,
      category: "פיתוח תוכנה",
      date: "ינואר 2025",
      grade: "100",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      additionalDetails: [
        "ממשק משתמש אינטואיטיבי ונוח",
        "אלגוריתם המלצות מבוסס AI",
        "תמיכה ב-1000+ פורמטים",
        "סנכרון ענן אוטומטי",
      ],
    },
    {
      title: "אתר לימוד אינטראקטיבי",
      description:
        "פלטפורמת לימוד מתקדמת עם תרגילים אינטראקטיביים, מעקב התקדמות ומערכת גיימיפיקציה",
      icon: BookOpen,
      category: "חינוך טכנולוגי",
      date: "דצמבר 2024",
      grade: "98",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      additionalDetails: [
        "למעלה מ-500 תרגילים",
        "מערכת תגמולים ותגים",
        "דוחות התקדמות מפורטים",
        "תמיכה במספר שפות",
      ],
    },
    {
      title: "מערכת ניהול תלמידים",
      description:
        "מערכת מקיפה למעקב אחר ציונים, נוכחות והתקדמות תלמידים עם דשבורד למורים והורים",
      icon: Users,
      category: "מערכות מידע",
      date: "נובמבר 2024",
      grade: "95",
      technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"],
      additionalDetails: [
        "ממשק נפרד למורים, תלמידים והורים",
        "התראות אוטומטיות",
        "דוחות מפורטים וחודשיים",
        "אינטגרציה עם מערכות קיימות",
      ],
    },
    {
      title: "אפליקציית קוד לימודי",
      description:
        "אפליקציה ללימוד תכנות דרך אתגרים וחידות לוגיות עם פתרונות מפורטים",
      icon: Code,
      category: "אפליקציות מובייל",
      date: "אוקטובר 2024",
      grade: "97",
      technologies: ["React Native", "Redux", "Jest", "GitHub Actions"],
      additionalDetails: [
        "200+ אתגרי תכנות",
        "רמות קושי שונות",
        "פתרונות מפורטים עם הסברים",
        "מצב תחרות מול חברים",
      ],
    },
  ];

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white"
      dir="rtl"
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-xl font-bold text-gray-800">
                עבודות בגרות במדעי המחשב
              </span>
              <div className="bg-blue-50 p-2 rounded-full">
                <GraduationCap className="text-blue-600 h-6 w-6" />
              </div>
            </div>
            <button
              onClick={() => setShowAlert(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              צור קשר
            </button>
          </div>
        </div>
      </nav>

      {showAlert && (
        <Alert onClose={() => setShowAlert(false)}>
          תודה על ההתעניינות! נחזור אליך בהקדם
        </Alert>
      )}

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-block mb-6">
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              פרויקטי בגרות במדעי המחשב - שנת הלימודים 2024-2025
            </div>
          </div>

          <h1 className="text-7xl font-bold text-gray-900 mb-6 leading-tight">
            עבודות מחשבים{" "}
            <span className="text-blue-600 inline-block">מצטיינות</span>
          </h1>

          <p className="text-2xl text-gray-600 leading-relaxed mb-8">
            אוסף של פרויקטי גמר מתקדמים בפיתוח תוכנה, אפליקציות ומערכות מידע. כל
            פרויקט פותח בטכנולוגיות מודרניות ומציג פתרון חדשני לבעיה אמיתית.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={handleScrollDown}
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              צפה בפרויקטים
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </button>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300">
              קרא עוד
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-gray-600">פרויקטים</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">97.5</div>
              <div className="text-gray-600">ממוצע ציונים</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">טכנולוגיות</div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-gradient-to-t from-blue-50/50 to-transparent py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-4">
              <Award className="h-12 w-12 text-blue-600 mx-auto" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              הפרויקטים שלנו
            </h2>
            <p className="text-xl text-gray-600">
              פרויקטי גמר מתקדמים שפותחו במסגרת לימודי הבגרות במדעי המחשב
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              טכנולוגיות בהן השתמשנו
            </h2>
            <p className="text-xl text-gray-600">
              כלי פיתוח וטכנולוגיות מתקדמות
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "React",
              "Node.js",
              "Python",
              "MongoDB",
              "TypeScript",
              "Firebase",
              "Vue.js",
              "PostgreSQL",
              "Docker",
              "React Native",
              "Tailwind CSS",
              "Express",
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="text-lg font-bold text-blue-600">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <GraduationCap className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">עבודות בגרות במדעי המחשב</span>
          </div>
          <p className="text-gray-400 mb-6">
            פרויקטי גמר מצטיינים בפיתוח תוכנה ומערכות מידע
          </p>
          <div className="text-gray-500 text-sm">
            © 2025 כל הזכויות שמורות | נבנה באהבה עם React
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BagrutHomepage;
