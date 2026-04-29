import React, { useMemo, useEffect, useState, useRef } from "react";
import API from "./api";
import "./App.css";

function App() {
  const streamLabels = {
    science: "Science",
    commerce: "Commerce",
    arts: "Arts",
  };

  const [selectedStream, setSelectedStream] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const fullText = "Confused after 12th?";
  const streamRef = useRef(null);

useEffect(() => {
  let i = 0;
  const interval = setInterval(() => {
    setText(fullText.slice(0, i + 1));
    i++;
    if (i === fullText.length) clearInterval(interval);
  }, 60);

  return () => clearInterval(interval);
}, []);

  const scrollToStreams = () => {
  streamRef.current?.scrollIntoView({ behavior: "smooth" });
};

  const handleStreamClick = async (streamKey) => {
  try {
    setLoading(true);
    setSelectedStream(streamKey);
    setSelectedCourse(null);
    setSearch("");

    const res = await API.get(`/courses/${streamKey}`);
    setCourses(res.data || []);
  } catch (error) {
    console.log("Retrying...");

    // Retry after 5 seconds (for Render wake-up)
    setTimeout(async () => {
      try {
        const res = await API.get(`/courses/${streamKey}`);
        setCourses(res.data || []);
      } catch (err) {
        console.log("Still failed:", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    }, 5000);

    return;
  }

  setLoading(false);
};

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToStreams = () => {
    setSelectedStream(null);
    setSelectedCourse(null);
    setCourses([]);
    setSearch("");
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.courseName.toLowerCase().includes(search.toLowerCase())
    );
  }, [courses, search]);

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-brand">
          <div>
            <h1>Career Guide Website</h1>
            <p>After 12th Career Explorer</p>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <section className="intro-section fade-in">
  <h2 className="typing">{text}</h2>

  <p>
    Choosing the right career path can be overwhelming with so many options
    available. This website helps you explore streams, courses, entrance exams,
    and eligibility in a simple way.
  </p>

  <p>
    Whether it's Science, Commerce, or Arts — everything you need to make the
    right decision is available here.
  </p>

  <p className="highlight-line">
    Start your journey towards a bright future 🚀
  </p>

  <button className="explore-btn" onClick={scrollToStreams}>
  Explore Now ↓
</button>
</section>
</section>

      {/* MAIN */}
      <main className="container">
        {!selectedStream && (
          <div className="glass-card fade-in" ref={streamRef}>
            <div className="section-top center">
              <h2>Select Your Stream</h2>
              <p>Start by selecting Science, Commerce, or Arts.</p>
            </div>

            <div className="stream-grid">
              {Object.keys(streamLabels).map((key) => (
                <div
                  key={key}
                  className="stream-card"
                  onClick={() => handleStreamClick(key)}
                >
                  <h3>{streamLabels[key]}</h3>
                  <p>View courses and career opportunities</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedStream && !selectedCourse && (
          <div className="glass-card fade-in">
            <div className="top-bar">
              <button className="back-btn" onClick={handleBackToStreams}>
                ← Back to Streams
              </button>
              <span className="badge">{streamLabels[selectedStream]}</span>
            </div>

            <h2>{streamLabels[selectedStream]} Courses</h2>

            <input
              type="text"
              placeholder="Search course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            {loading ? (
              <div className="loader-container">
    <div className="spinner"></div>
    <p>Waking up server... please wait ⏳</p>
  </div>
            ) : filteredCourses.length > 0 ? (
              <div className="course-list">
                {filteredCourses.map((course) => (
                  <div
                    key={course._id}
                    className="course-card"
                    onClick={() => handleCourseClick(course)}
                  >
                    <h3>{course.courseName}</h3>
                    <p>{course.duration}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No matching courses found.</p>
            )}
          </div>
        )}

        {selectedStream && selectedCourse && (
          <div className="glass-card fade-in">
            <button className="back-btn" onClick={handleBackToCourses}>
              ← Back
            </button>

            <h2>{selectedCourse.courseName}</h2>

            <p><b>Duration:</b> {selectedCourse.duration}</p>
            <p><b>Eligibility:</b> {selectedCourse.eligibility}</p>
            <p><b>Entrance Exams:</b> {selectedCourse.entranceExams?.join(", ")}</p>
            <p><b>Best Colleges:</b> {selectedCourse.bestColleges?.join(", ")}</p>
          </div>
        )}
      </main>

       {/* FLOAT BUTTONS */}
      <div className="contact-buttons">
        <a href="tel:+919664525008" className="call-btn">📞</a>
        <a href="https://wa.me/919664525008" className="whatsapp-btn">💬</a>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Career Guide Website</p>
        <p>Made by Shivam Joshi & Nidhi Ramchandani</p>
      </footer>

    </div>
  );
}

export default App;