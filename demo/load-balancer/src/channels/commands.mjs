export class RUNNER_COMMAND_TYPE {
    static STARTED = 'worker-started';
    static EXECUTE_TASK = 'execute-task';
    static TASK_COMPLETE = 'task-complete';
}

export class PRODUCER_COMMAND_TYPE {
    static ALTER_RPS = 'producer-set-rps';
    static TASK = 'producer-new-task-ready';
}

export class BALANCER_COMMAND_TYPE {
    static STARTED = 'balancer-has-started';
}

export class STATS_INFO_TYPE {
    static PRODUCER_RPS = 'produce-rps';
    static BALANCER_QUEUE_SIZE = 'balancer-queue-size';
    static BALANCER_RUNNERS_SIZE = 'balancer-runners-size';
    static RUNNERS_RUNNERS_SPWANED = 'runners-runners-count';
    static RUNNER_QUEUE_SIZE = 'runner-queue-size';
}
