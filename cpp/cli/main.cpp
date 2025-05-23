#include <iostream>
#include <string>
#include "CommandProcessor.h"

int main() {
    CommandProcessor commandProcessor;

    std::string command;
    while (true) {
        std::cout << "Enter command: ";
        std::getline(std::cin, command);

        if (command == "exit") {
            break;
        }

        commandProcessor.processCommand(command);
    }

    return 0;
}