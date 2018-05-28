-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ponydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ponydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ponydb` DEFAULT CHARACTER SET utf8 ;
USE `ponydb` ;

-- -----------------------------------------------------
-- Table `ponydb`.`providers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponydb`.`providers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ponydb`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponydb`.`cities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ponydb`.`registrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponydb`.`registrations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `provider_id` INT NOT NULL,
  `city_id` INT NOT NULL,
  `packet` ENUM("combi", "electricity", "gas") NOT NULL,
  `type` ENUM("overstap", "verhuizing") NOT NULL,
  `green` TINYINT NOT NULL,
  `age` TINYINT NOT NULL,
  PRIMARY KEY (`id`, `provider_id`, `city_id`),
  INDEX `fk_registrations_providers_idx` (`provider_id` ASC),
  INDEX `fk_registrations_cities1_idx` (`city_id` ASC),
  CONSTRAINT `fk_registrations_providers`
    FOREIGN KEY (`provider_id`)
    REFERENCES `ponydb`.`providers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_registrations_cities1`
    FOREIGN KEY (`city_id`)
    REFERENCES `ponydb`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ponydb`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponydb`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ponydb`.`media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponydb`.`media` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ponydb`.`news_appearances`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ponydb`.`news_appearances` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `remarks` VARCHAR(45) NULL,
  `category_id` INT NOT NULL,
  `media_id` INT NOT NULL,
  PRIMARY KEY (`id`, `category_id`, `media_id`),
  INDEX `fk_news_appearances_category1_idx` (`category_id` ASC),
  INDEX `fk_news_appearances_media1_idx` (`media_id` ASC),
  CONSTRAINT `fk_news_appearances_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `ponydb`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_news_appearances_media1`
    FOREIGN KEY (`media_id`)
    REFERENCES `ponydb`.`media` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
