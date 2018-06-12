-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bookstore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bookstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookstore` DEFAULT CHARACTER SET utf8 ;
USE `bookstore` ;

-- -----------------------------------------------------
-- Table `bookstore`.`publishing_house`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`publishing_house` (
  `id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NULL,
  `phone` VARCHAR(20) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstore`.`book_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`book_category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstore`.`book_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`book_info` (
  `isbn` INT UNSIGNED NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  `year` INT UNSIGNED NULL,
  `publisher_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`isbn`),
  INDEX `fk_book_info_publisher_id_idx` (`publisher_id` ASC),
  INDEX `fk_book_info_category_id_idx` (`category_id` ASC),
  CONSTRAINT `fk_book_info_publisher_id`
    FOREIGN KEY (`publisher_id`)
    REFERENCES `bookstore`.`publishing_house` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_book_info_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `bookstore`.`book_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstore`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`inventory` (
  `isbn` INT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL,
  `threshold` INT UNSIGNED NOT NULL,
  `price` DECIMAL(3,2) NULL,
  PRIMARY KEY (`isbn`),
  CONSTRAINT `fk_inventory_isbn`
    FOREIGN KEY (`isbn`)
    REFERENCES `bookstore`.`book_info` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstore`.`author_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`author_info` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstore`.`book_author`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`book_author` (
  `isbn` INT UNSIGNED NOT NULL,
  `author_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`isbn`, `author_id`),
  INDEX `fk_book_author_author_id_idx` (`author_id` ASC),
  CONSTRAINT `fk_book_author_isbn`
    FOREIGN KEY (`isbn`)
    REFERENCES `bookstore`.`book_info` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_book_author_author_id`
    FOREIGN KEY (`author_id`)
    REFERENCES `bookstore`.`author_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstore`.`user_accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`user_accounts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `user_name` VARCHAR(15) NULL,
  `credentials` INT UNSIGNED NOT NULL,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `address` VARCHAR(255) NULL,
  `phone` VARCHAR(20) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstore`.`customer_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`customer_cart` (
  `user_id` INT UNSIGNED NOT NULL,
  `isbn` INT UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NULL,
  PRIMARY KEY (`user_id`, `isbn`),
  INDEX `fk_customer_cart_isbn_idx` (`isbn` ASC),
  CONSTRAINT `fk_customer_cart_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `bookstore`.`user_accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_cart_isbn`
    FOREIGN KEY (`isbn`)
    REFERENCES `bookstore`.`inventory` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstore`.`customer_order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`customer_order` (
  `purchase_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `isbn` INT UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  `unit_price` DECIMAL(3,2) NULL,
  `date` DATE NULL,
  PRIMARY KEY (`purchase_id`),
  INDEX `fk_customer_order_user_id_idx` (`user_id` ASC),
  INDEX `fk_customer_order_isbn_idx` (`isbn` ASC),
  CONSTRAINT `fk_customer_order_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `bookstore`.`user_accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_customer_order_isbn`
    FOREIGN KEY (`isbn`)
    REFERENCES `bookstore`.`inventory` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bookstore`.`publisher_orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookstore`.`publisher_orders` (
  `order_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `isbn` INT UNSIGNED NOT NULL,
  `publisher_id` INT UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  `date` DATE NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_publisher_orders_isbn_idx` (`isbn` ASC),
  INDEX `fk_publisher_orders_publisher_id_idx` (`publisher_id` ASC),
  CONSTRAINT `fk_publisher_orders_isbn`
    FOREIGN KEY (`isbn`)
    REFERENCES `bookstore`.`inventory` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_publisher_orders_publisher_id`
    FOREIGN KEY (`publisher_id`)
    REFERENCES `bookstore`.`publishing_house` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
