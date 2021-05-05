package com.github.shadowb64.rioru.commands.utils

import com.github.shadowb64.rioru.commands.marshall.CommandContext
import com.github.shadowb64.rioru.commands.utils.interfaces.ICommand

abstract class Command: ICommand {
    final override val config: CommandInfo = javaClass.getAnnotation(CommandInfo::class.java)
    override val name = config.name
    abstract override fun run(context: CommandContext)
}