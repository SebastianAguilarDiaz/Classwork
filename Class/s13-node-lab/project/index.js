// index.js - Student Starter Skeleton
// TODO 1: Import built-in Node modules (os, fs/promises, path)
// TODO 2: Import third-party NPM packages (chalk)
import os from "os";
// const os = require('os');
import chalk from "chalk";
import fse from "fs-extra";
async function generateTelemetryReport() {
  console.log("Initializing Node.js Telemetry Engine...");

  try {
    // ==========================================
    // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
    // ==========================================
    // TODO: Get CPU architecture, platform, free memory (in MB), and system uptime (in hours)
    const platform = os.platform();
    const freeMemMB = (os.freemem() / (1024 * 1024)).toFixed(0);
    const uptimeHours = (os.uptime() / 3600).toFixed(2);
    const CPUModel = os.cpus()[0].model;
    const totalMemory = (os.totalmem() / (1024 * 1024)).toFixed(0);
    const usedMemory = totalMemory - freeMemMB;
    // ==========================================
    // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
    // ==========================================
    // TODO: Print a colorful status report to the terminal using chalk colors
    console.log("==========================================");
    console.log("         SYSTEM & ENV TELEMETRY           ");
    console.log("==========================================");
    // Print Platform, Free Memory, and Uptime with custom colors
    console.log(`${chalk.bold("OS Platform:")}      ${chalk.yellow(platform)}`);
    console.log(
      `${chalk.bold("Free memory (MB): ")}      ${chalk.green(freeMemMB)}`,
    );
    console.log(
      `${chalk.bold("Total memory (MB)")}      ${chalk.blueBright(totalMemory)}`,
    );
    console.log(
      `${chalk.bold("Used memory (MB)")}      ${chalk.red(usedMemory)}`,
    );
    console.log(
      `${chalk.bold("CPU mmodel")}      ${chalk.blueBright(CPUModel)}`,
    );
    console.log(
      `${chalk.bold("Uptime")}      ${chalk.blueBright(uptimeHours)}`,
    );

    // ==========================================
    // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
    // ==========================================
    const logEntry = `[${new Date().toISOString()}] PLATFORM: ${platform} | FREEMEM: ${freeMemMB}MB | TOTALMEM: ${totalMemory}MB | USEDMEMORY : ${usedMemory} | CPUMODEL: ${CPUModel} | UPTIME: ${uptimeHours}`;

    // TODO: Append logEntry to 'telemetry.log' using fs.appendFile()
    console.log("Writing log entry to disk...");
    fse.appendFile("log.txt", logEntry + "\n", (error) => {
      if (error === null) return;
      console.log(`An error ocurred`);
      console.log(error);
    });

    console.log("Telemetry audit completed successfully!");
  } catch (error) {
    console.error("Telemetry report generation failed:", error.message);
  }
}

// Execute engine
generateTelemetryReport();
