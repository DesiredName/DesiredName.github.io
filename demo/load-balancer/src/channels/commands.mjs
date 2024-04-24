export class RUNNER_COMMAND_TYPE {
    static STARTED = 'worker-started';
    static EXECUTE_TASK = 'execute-task';
    static TASK_COMPLETE = 'task-complete';
}

export class PRODUCER_COMMAND_TYPE {
    static ALTER_RPS = 'producer-set-rps';
    static TASK = 'producer-new-task-ready';
    static START = 'producer-start-working';
    static STOP = 'producer-stop-working';
}

export class BALANCER_COMMAND_TYPE {
    static STARTED = 'balancer-has-started';
}

export class STATS_INFO_TYPE {
    static PRODUCER_RPS = 'produce-rps';
    static BALANCER_QUEUE_SIZE = 'balancer-queue-size';
    static BALANCER_RUNNERS_SIZE = 'balancer-runners-size';
}
