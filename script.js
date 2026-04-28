async function showDetails(stream, courseName) {
    const details = document.getElementById("details");

    details.innerHTML = `<div class="hint">Loading details...</div>`;

    try {
        const response = await fetch(
          `${API_BASE}/${stream}/course/${encodeURIComponent(courseName)}`
        );
        const course = await response.json();

        details.innerHTML = `
            <div class="section">
                <h2>${course.name}</h2>
                <p><strong>Duration:</strong> ${course.duration}</p>
                <p><strong>Eligibility:</strong> ${course.eligibility}</p>
                <p><strong>Entrance Exams:</strong> ${course.exams}</p>
                <p><strong>Career Scope:</strong> ${course.scope}</p>
                <p><strong>Top Colleges:</strong> ${course.colleges.join(", ")}</p>
            </div>
        `;

        details.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
        details.innerHTML = `<div class="hint">Course details load nathi thayu.</div>`;
        console.error(error);
    }
}

window.loadStream = loadStream;
window.showDetails = showDetails;