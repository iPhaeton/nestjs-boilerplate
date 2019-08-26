import { Controller, Post, Body, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller('user')
export class UserController {}