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
