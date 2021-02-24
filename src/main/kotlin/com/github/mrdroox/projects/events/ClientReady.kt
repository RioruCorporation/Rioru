package com.github.mrdroox.projects.events

import com.github.mrdroox.projects.utilities.others.LoggerActivities

import net.dv8tion.jda.api.events.ReadyEvent
import net.dv8tion.jda.api.hooks.ListenerAdapter

class ClientReady: ListenerAdapter() {
    override fun onReady(event: ReadyEvent) {
        LoggerActivities.success("${event.jda.selfUser.name}(${event.jda.selfUser.id}) started with success")
        LoggerActivities.info("Operation System: ${System.getProperty("os.name")}")
        LoggerActivities.info("========== ${event.jda.selfUser.name} Stats ==========")
        LoggerActivities.info("Guilds: ${event.guildTotalCount}")
        LoggerActivities.info("Users: ${event.jda.users.size}")
        LoggerActivities.info("======================================================")
    }
}