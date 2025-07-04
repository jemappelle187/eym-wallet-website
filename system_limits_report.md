# System Limits Report

## Overview
This report details the various system limits configured for your workspace environment.

## User Information
- **User**: ubuntu (UID: 1000)
- **Group**: ubuntu (GID: 1000)
- **OS**: Linux 6.8.0-1024-aws
- **Shell**: /usr/bin/bash

## Resource Limits (ulimit -a)

### Memory & Process Limits
- **Max memory size**: unlimited
- **Max locked memory**: 8,192 KB
- **Stack size**: 8,192 KB
- **Max user processes**: unlimited
- **Virtual memory**: unlimited
- **Data segment size**: unlimited

### File System Limits
- **File size**: unlimited
- **Open files**: 1,048,576 (1M files)
- **File locks**: unlimited
- **Core file size**: unlimited

### System-Wide Limits
- **System-wide max open files**: 9,223,372,036,854,775,807 (essentially unlimited)
- **Maximum process ID**: 4,194,304

### Time & Priority Limits
- **CPU time**: unlimited
- **Real-time priority**: 0
- **Scheduling priority**: 0
- **Real-time non-blocking time**: unlimited

### IPC Limits
- **Pending signals**: 125,487
- **POSIX message queues**: 819,200 bytes
- **Pipe size**: 8 × 512 bytes

## Storage Information
- **Workspace filesystem**: overlay (1.0T total)
- **Used space**: 35GB
- **Available space**: 990GB
- **Usage**: 4%
- **Quota system**: None detected

## Memory Information
- **Total RAM**: 30GB
- **Used RAM**: 3.1GB
- **Free RAM**: 8.7GB
- **Buffer/Cache**: 19GB
- **Available RAM**: 27GB
- **Swap**: 0B (no swap configured)

## CPU Information
- **CPU cores**: 4

## Summary
Your system has very generous limits with most resources set to unlimited. Key practical limits include:
- **Open files**: 1 million concurrent files
- **Memory**: 30GB total RAM with 27GB available
- **Storage**: 990GB available in workspace
- **CPU**: 4 cores available

The system appears to be well-configured for development work with minimal restrictions.