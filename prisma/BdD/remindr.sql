-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 13 déc. 2023 à 11:50
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `remindr`
--

-- --------------------------------------------------------

--
-- Structure de la table `appartenir`
--

CREATE TABLE `appartenir` (
  `IDUser` int(11) NOT NULL,
  `IDGroup` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `finir`
--

CREATE TABLE `finir` (
  `IDUser` int(11) NOT NULL,
  `IDRappel` int(11) NOT NULL,
  `Check` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

CREATE TABLE `groups` (
  `IDGroup` int(11) NOT NULL,
  `nom` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reminders`
--

CREATE TABLE `reminders` (
  `IDRappel` int(11) NOT NULL,
  `titre` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateFin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `IDUser` int(11) NOT NULL,
  `mail` varchar(191) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `mdp` varchar(191) NOT NULL,
  `prenom` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `appartenir`
--
ALTER TABLE `appartenir`
  ADD PRIMARY KEY (`IDUser`,`IDGroup`),
  ADD UNIQUE KEY `Appartenir_IDUser_key` (`IDUser`),
  ADD UNIQUE KEY `Appartenir_IDGroup_key` (`IDGroup`);

--
-- Index pour la table `finir`
--
ALTER TABLE `finir`
  ADD PRIMARY KEY (`IDUser`,`IDRappel`),
  ADD UNIQUE KEY `Finir_IDUser_key` (`IDUser`),
  ADD UNIQUE KEY `Finir_IDRappel_key` (`IDRappel`);

--
-- Index pour la table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`IDGroup`),
  ADD UNIQUE KEY `Groups_nom_key` (`nom`);

--
-- Index pour la table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`IDRappel`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`IDUser`),
  ADD UNIQUE KEY `Users_mail_key` (`mail`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `groups`
--
ALTER TABLE `groups`
  MODIFY `IDGroup` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `IDRappel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `IDUser` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `appartenir`
--
ALTER TABLE `appartenir`
  ADD CONSTRAINT `Appartenir_IDGroup_fkey` FOREIGN KEY (`IDGroup`) REFERENCES `groups` (`IDGroup`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Appartenir_IDUser_fkey` FOREIGN KEY (`IDUser`) REFERENCES `users` (`IDUser`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `finir`
--
ALTER TABLE `finir`
  ADD CONSTRAINT `Finir_IDRappel_fkey` FOREIGN KEY (`IDRappel`) REFERENCES `reminders` (`IDRappel`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Finir_IDUser_fkey` FOREIGN KEY (`IDUser`) REFERENCES `users` (`IDUser`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
