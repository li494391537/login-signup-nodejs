# signin-signup-nodejs

## A node.js project about signin and signup.

create database test;
show databases;
use test;
create table user(
    uid int primary key auto_increment,
    username varchar(40) unique not null,
    password varchar(64) not null,
    email varchar(40) unique not null,
    regtime varchar(40) not null,
    role varchar(2) not null default 1
);

insert into user(username, password, email, regtime, role) 
values('han', '123', '123@q.com','2017', '1');