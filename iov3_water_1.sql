-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2018 at 02:32 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iov3_water`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_base_year`
--

CREATE TABLE `data_base_year` (
  `id` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data_used` int(45) DEFAULT NULL,
  `data_readonly` int(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `data_base_year`
--

INSERT INTO `data_base_year` (`id`, `name`, `data_used`, `data_readonly`) VALUES
(7, '2019', 0, 1),
(8, '2020', 0, 0),
(9, '2009', 0, 0),
(10, '2998', 1, 0),
(11, '888', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `num_in` int(11) NOT NULL COMMENT 'ເລກທີ່ເອກະສານ',
  `doc_in_out` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ປະເພດເອກະສານ ຂາເຂົ້າ ຫລື ຂາອອກ',
  `name` varchar(245) COLLATE utf8_unicode_ci NOT NULL,
  `detail` varchar(145) COLLATE utf8_unicode_ci DEFAULT NULL,
  `file_scan` varchar(245) COLLATE utf8_unicode_ci DEFAULT NULL,
  `doc_type` int(11) DEFAULT NULL COMMENT 'ໝວດເອກະສານ',
  `doc_from` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ຈາກພາກສ່ວນ',
  `doc_to` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ເຖິງພາກສ່ວນ',
  `doc_from_type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ປະເພດພາກສ່ວນເຊັ່ນ: ພາຍໃນ ຫລື ພາຍນອກ inside / outside',
  `sector_type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `doc_approve` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ເອກະສານ ທີ່ຕ້ອງໄດ້ຮັບການ ອະນຸມັດ',
  `ceo_app` int(11) DEFAULT NULL,
  `doc_view` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ເອກະສານ ທີ່ user ໄດ້ເປີດອ່ານ',
  `status` varchar(45) COLLATE utf8_unicode_ci NOT NULL COMMENT 'ສະຖານະ ໃຫ້ສະແດງຜົນ ຫລືບໍ່ສະແດງ show/hide',
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grono_doc`
--

CREATE TABLE `grono_doc` (
  `id` int(11) NOT NULL,
  `sector_id` int(45) NOT NULL,
  `grono_type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ປະເພດໂກຼໂນ ເຂົ້າ ຫລື ອອກ in out\n',
  `doc_from_type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ປະເພດພາກສ່ວນເຊັ່ນ: ພາຍໃນ ຫລື ພາຍນອກ inside / outside',
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `grono_doc`
--

INSERT INTO `grono_doc` (`id`, `sector_id`, `grono_type`, `doc_from_type`, `name`) VALUES
(82, 51, 'in', NULL, 'ໃບສະເໜີ ລາພັກ'),
(83, 51, 'in', NULL, 'ແຈ້ງການ ແນະນຳ'),
(84, 51, 'out', NULL, 'ບົດບັນທຶກ ກອງປະຊຸມ'),
(85, 51, 'out', NULL, 'ແຜນວຍກ'),
(86, 47, 'out', NULL, 'ຄຳສັ່ງແນະນຳ'),
(87, 47, 'in', NULL, 'ແຜນລົງເຄື່ອນໄຫວວຽກ'),
(88, 47, 'in', NULL, 'ຄຳສັ່ງແນະນຳ ຂອງແຂວງ'),
(89, 50, 'in', NULL, 'ແຜນວຽກ ປະຈຳອາທິດ'),
(90, 50, 'in', NULL, 'ຄຳສັ່ງແນະນຳ'),
(91, 50, 'out', NULL, 'ບົດລາຍງານ'),
(92, 50, 'out', NULL, 'ບົດລາຍງານການເມືອງ ປະຈຳປີ'),
(93, 52, 'out', NULL, 'ຖຖຖຖຖ'),
(94, 52, 'out', NULL, 'ຟຟຟ'),
(95, 52, 'in', NULL, '1111'),
(96, 52, 'in', NULL, '22222'),
(97, 52, 'in', NULL, '4444'),
(98, 52, 'out', NULL, '6677'),
(99, 53, 'in', NULL, 'xxxxx');

-- --------------------------------------------------------

--
-- Table structure for table `log_data`
--

CREATE TABLE `log_data` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `editor` varchar(245) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ປະເພດສິດ\nall = ເຫັນຂໍ້ມູນທຸກ User\nrs = ເຫັນຂໍ້ມູນທຸກ user ພາຍໃນຂະແໜງ\nrm = ເຫັນຂໍ້ມູນຂອງຕົນເອງ ພາຍໃນຂະແໜງ\nap = ມີສິດອານຸມັດເອກະສານ\ned = ມີສິດແກ້ໄຂ, ລຶບຂໍ້ມູນ',
  `description` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sector`
--

CREATE TABLE `sector` (
  `id` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `village` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `province` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sector_type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ປະເພດຂອງ ຂະແໜງການ\nho = ສຳນັກງານໃຫຍ່\nse = ສະແໜງການ\nbc = ສາຂາ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sector`
--

INSERT INTO `sector` (`id`, `name`, `village`, `city`, `province`, `tel`, `sector_type`) VALUES
(47, 'ສຳນັກງານ ສາຂາ', 'ບ້ານ ໂພໄຊ', 'ເມືອງ ໄຊ', 'ແຂວງ ອຸດົມໄຊ', '020 345678', 'bc'),
(49, 'ຫ້ອງການ ຊາວໜຸ່ມ ເມືອງ', 'ບ້ານ ລ້ອງກໍເດື່ອຍ', 'ເມືອງ ໄຊ', 'ແຂວງ ອຸດົມໄຊ', '081 345678', 'ou'),
(50, 'ຫ້ອງການ ໄຟຟ້າແຂວງ', 'ບ້ານ ນາເລົາ', 'ເມືອງ ໄຊ', 'ແຂວງ ອຸດົມໄຊ', '081 31233445', 'ou'),
(51, 'ຂະແໜງ ຫ້ອງການ ບໍລິຫານ', 'ບ້ານ ລ້ອງກໍເດື່ອຍ', 'ເມືອງ ໄຊ', 'ແຂວງ ອຸດົມໄຊ', '020 765983', 'se'),
(52, 'ສາຂາ ອຸດົມໄຊ', 'ດດດ', 'ກກ', 'ດດດ', 'ດດດ', 'ho'),
(53, 'ຂະແໜງ ຈັດຕັ້ງພະນັກງານ 4', 'cds', 'ds', 'cds', 'cdscds', 'se');

-- --------------------------------------------------------

--
-- Table structure for table `setting_data`
--

CREATE TABLE `setting_data` (
  `id` int(11) NOT NULL,
  `name` varchar(145) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `logopic` varchar(145) COLLATE utf8_unicode_ci DEFAULT NULL,
  `file_type_upload` varchar(245) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ປະເພດໄຟລ໌ ທີ່ອະນຸຍາດໃຫ້ອັບໂຫລດ',
  `maxfile_size` int(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `setting_data`
--

INSERT INTO `setting_data` (`id`, `name`, `type`, `logopic`, `file_type_upload`, `maxfile_size`) VALUES
(1, NULL, NULL, NULL, '\'image/png\',\'application/pdf\',\'image/jpeg\',', 2048);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `permission` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sector_id` int(11) DEFAULT NULL,
  `user_type` varchar(45) COLLATE utf8_unicode_ci NOT NULL COMMENT 'ສະຖານະຂອງ User: admin, user ແລະ ceo',
  `profile` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pass` varchar(245) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ສະຖານະ User: active ນຳໃຊ້ຢູ່ / inactive ບໍ່ນຳໃຊ້',
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_base_year`
--
ALTER TABLE `data_base_year`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grono_doc`
--
ALTER TABLE `grono_doc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_data`
--
ALTER TABLE `log_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sector`
--
ALTER TABLE `sector`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setting_data`
--
ALTER TABLE `setting_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_base_year`
--
ALTER TABLE `data_base_year`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grono_doc`
--
ALTER TABLE `grono_doc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `log_data`
--
ALTER TABLE `log_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sector`
--
ALTER TABLE `sector`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `setting_data`
--
ALTER TABLE `setting_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
