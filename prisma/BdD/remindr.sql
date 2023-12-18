-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 18 déc. 2023 à 15:53
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

--
-- Déchargement des données de la table `appartenir`
--

INSERT INTO `appartenir` (`IDUser`, `IDGroup`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `finir`
--

CREATE TABLE `finir` (
  `IDUser` int(11) NOT NULL,
  `IDRappel` int(11) NOT NULL,
  `Check` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `finir`
--

INSERT INTO `finir` (`IDUser`, `IDRappel`, `Check`) VALUES
(1, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

CREATE TABLE `groups` (
  `IDGroup` int(11) NOT NULL,
  `nom` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `groups`
--

INSERT INTO `groups` (`IDGroup`, `nom`) VALUES
(1, 'group1');

-- --------------------------------------------------------

--
-- Structure de la table `reminders`
--

CREATE TABLE `reminders` (
  `IDRappel` int(11) NOT NULL,
  `titre` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `dateCreation` datetime NOT NULL DEFAULT current_timestamp(),
  `dateFin` datetime NOT NULL,
  `IDGroup` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reminders`
--

INSERT INTO `reminders` (`IDRappel`, `titre`, `description`, `dateCreation`, `dateFin`, `IDGroup`) VALUES
(1, 'Terminer Remindr', 'Finir avant le 22 décembre le projet', '2023-12-15 12:19:26', '2023-12-22 00:00:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `IDUser` int(11) NOT NULL,
  `mail` varchar(191) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `prenom` varchar(191) NOT NULL,
  `mdp` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`IDUser`, `mail`, `nom`, `prenom`, `mdp`) VALUES
(1, 'bilal25007@gmail.com', 'oulahal', 'Bilal', 'c81b021331344adcdd57a84413824fe14faa33769d9982e13d00c260e643b0f7'),
(2, 'test@gmail.com', 'r', 'r', '454349e422f05297191ead13e21d3db520e5abef52055e4964b82fb213f593a1'),
(3, 'momo@momo', 'chemarin', 'momo', '3100486406b39efc3f3d3565bc97cc3b9e2d7b6e3427b194f4442ef4beb05b41');

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
  ADD PRIMARY KEY (`IDRappel`),
  ADD KEY `Reminders_IDGroup_fkey` (`IDGroup`);

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
  MODIFY `IDGroup` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `IDRappel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `IDUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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

--
-- Contraintes pour la table `reminders`
--
ALTER TABLE `reminders`
  ADD CONSTRAINT `Reminders_IDGroup_fkey` FOREIGN KEY (`IDGroup`) REFERENCES `groups` (`IDGroup`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
