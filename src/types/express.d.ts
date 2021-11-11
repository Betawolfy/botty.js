import express from "express";
import type { ShardingManager } from "discord.js";

export interface CustomRequest extends express.Request {
  discord: ShardingManager;
}
