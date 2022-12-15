-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Des 2022 pada 07.15
-- Versi server: 10.4.21-MariaDB-log
-- Versi PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `geo_attendance`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_absen_guru`
--

CREATE TABLE `tbl_absen_guru` (
  `id_absen_guru` int(11) NOT NULL,
  `nip` varchar(100) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `tanggal` varchar(100) DEFAULT NULL,
  `jam` varchar(100) DEFAULT NULL,
  `kelas` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tbl_absen_guru`
--

INSERT INTO `tbl_absen_guru` (`id_absen_guru`, `nip`, `nama`, `latitude`, `longitude`, `tanggal`, `jam`, `kelas`) VALUES
(12, '101023', 'Abdul', -6.9173248, 107.610112, NULL, NULL, NULL),
(13, '101023', 'Abdul', -6.9173248, 107.610112, NULL, NULL, NULL),
(14, '101023', 'Abdul', -6.9173248, 107.610112, NULL, NULL, NULL),
(15, '101023', 'Abdul', -6.9173248, 107.610112, NULL, NULL, NULL),
(16, '101023', 'Abdul', -6.9173248, 107.610112, NULL, NULL, NULL),
(17, '101023', 'Abdul', -6.9173248, 107.610112, NULL, NULL, NULL),
(18, '101023', 'Abdul', -6.9173248, 107.610112, NULL, NULL, NULL),
(19, '101023', 'Abdul', -6.9173248, 107.610112, NULL, NULL, NULL),
(20, '101023', 'Abdul', -6.9173249, 107.610113, NULL, NULL, NULL),
(21, '101023', 'Abdul', -6.9173249, 107.610113, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_absen_siswa`
--

CREATE TABLE `tbl_absen_siswa` (
  `id_absen_siswa` int(11) NOT NULL,
  `nis` varchar(100) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `tanggal` varchar(100) DEFAULT NULL,
  `jam` varchar(100) DEFAULT NULL,
  `kelas` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id_admin` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tbl_admin`
--

INSERT INTO `tbl_admin` (`id_admin`, `nama`, `username`, `password`) VALUES
(1, 'Angga ', 'angga', '123456');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_guru`
--

CREATE TABLE `tbl_guru` (
  `nip` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tempat_lahir` varchar(255) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `jk` varchar(255) NOT NULL,
  `agama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tbl_guru`
--

INSERT INTO `tbl_guru` (`nip`, `nama`, `tempat_lahir`, `tanggal_lahir`, `alamat`, `jk`, `agama`, `email`, `username`, `password`) VALUES
(120, 'Angga', 'Bandung', '2022-11-08', 'Bandung', 'Perempuan', 'Islam', 'anggasaeful3@gmail.com', '120', 'sekolah120');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_siswa`
--

CREATE TABLE `tbl_siswa` (
  `nis` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tempat_lahir` varchar(255) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `jk` varchar(255) NOT NULL,
  `agama` varchar(255) NOT NULL,
  `kelas` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tbl_siswa`
--

INSERT INTO `tbl_siswa` (`nis`, `nama`, `tempat_lahir`, `tanggal_lahir`, `alamat`, `jk`, `agama`, `kelas`, `email`, `username`, `password`) VALUES
(124, 'Angga Saeful Prayoga', 'Jl. Banjaran kab andung no.58', '0000-00-00', 'Jl. Banjaran kab andung no.58', 'Laki laki', 'Islam', '12 RPL', 'anggasaeful@gmail.com', 'anggas', 'pw123');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tbl_absen_guru`
--
ALTER TABLE `tbl_absen_guru`
  ADD PRIMARY KEY (`id_absen_guru`);

--
-- Indeks untuk tabel `tbl_absen_siswa`
--
ALTER TABLE `tbl_absen_siswa`
  ADD PRIMARY KEY (`id_absen_siswa`);

--
-- Indeks untuk tabel `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indeks untuk tabel `tbl_guru`
--
ALTER TABLE `tbl_guru`
  ADD PRIMARY KEY (`nip`);

--
-- Indeks untuk tabel `tbl_siswa`
--
ALTER TABLE `tbl_siswa`
  ADD PRIMARY KEY (`nis`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tbl_absen_guru`
--
ALTER TABLE `tbl_absen_guru`
  MODIFY `id_absen_guru` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `tbl_absen_siswa`
--
ALTER TABLE `tbl_absen_siswa`
  MODIFY `id_absen_siswa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
