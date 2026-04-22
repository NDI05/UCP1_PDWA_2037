function loadData() {
  const members = JSON.parse(localStorage.getItem("techkomMembers")) || [];
  displayTable(members);
}

function displayTable(members) {
  const tableWrapper = document.getElementById("tableWrapper");

  if (members.length === 0) {
    tableWrapper.innerHTML =
      '<p class="empty-message">Belum ada anggota yang terdaftar. Daftarkan diri Anda sekarang!</p>';
    return;
  }

  let tableHTML = `
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>NO</th>
                    <th>NAMA</th>
                    <th>EMAIL</th>
                    <th>MINAT</th>
                    <th>AKSI</th>
                </tr>
            </thead>
            <tbody>`;

  members.forEach((member, index) => {
    tableHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${member.nama}</td>
                    <td>${member.email}</td>
                    <td>${member.minat}</td>
                    <td>
                        <button class="btn btn-dark btn-delete" onclick="deleteMember(${index})">Hapus</button>
                    </td>
                </tr>
            `;
  });

  tableHTML += `
            </tbody>
        </table>
    `;
  tableWrapper.innerHTML = tableHTML;
}

document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("textNama").value.trim();
    const email = document.getElementById("textEmail").value.trim();
    const minat = document.getElementById("textMinat").value;

    if (!nama || !email || !minat) {
      alert("Semua field harus diisi!");
      return;
    }

    let members = JSON.parse(localStorage.getItem("techkomMembers")) || [];

    if (members.some((member) => member.email === email)) {
      alert("Email sudah terdaftar!");
      return;
    }
    members.push({
      nama: nama,
      email: email,
      minat: minat,
    });

    localStorage.setItem("techkomMembers", JSON.stringify(members));

    document.getElementById("registerForm").reset();

    loadData();

    alert("Pendaftaran berhasil! Terima kasih telah bergabung dengan TECHKOM!");
  });

function deleteMember(index) {
  if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    let members = JSON.parse(localStorage.getItem("techkomMembers")) || [];
    members.splice(index, 1);
    localStorage.setItem("techkomMembers", JSON.stringify(members));
    loadData();
  }
}

window.addEventListener("load", loadData);

/* ==================== GALLERY FUNCTIONALITY ==================== */

// Function to view image in modal
function viewImage(imageSrc, title) {
  document.getElementById("modalImage").src = imageSrc;
  document.getElementById("imageTitle").textContent = title;
}

// Function to view video in modal
function viewVideo(videoSrc, title) {
  document.getElementById("modalVideo").src = videoSrc;
  document.getElementById("videoTitle").textContent = title;
}

// Filter Gallery Items
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter items with animation
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
          item.classList.add("show");
          setTimeout(() => {
            item.style.display = "block";
          }, 10);
        } else {
          item.classList.remove("show");
          item.classList.add("hidden");
          item.style.display = "none";
        }
      });
    });
  });

  // Initialize gallery - show all items by default
  galleryItems.forEach((item) => {
    item.style.display = "block";
    item.classList.add("show");
  });
});

// Close modal when clicking outside
document.addEventListener("click", function (event) {
  const imageModal = document.getElementById("imageModal");
  const videoModal = document.getElementById("videoModal");

  if (event.target == imageModal) {
    imageModal.style.display = "none";
  }
  if (event.target == videoModal) {
    videoModal.style.display = "none";
  }
});

// Clear video src when modal is closed (to stop audio)
document.addEventListener("hidden.bs.modal", function (e) {
  if (e.target.id === "videoModal") {
    document.getElementById("modalVideo").src = "";
  }
});
