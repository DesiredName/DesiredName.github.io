export class RUNNER_COMMAND_TYPE {
    static STARTED = 'worker-started';
    static EXECUTE_TASK = 'execute-task';
}

export class PRODUCER_COMMAND_TYPE {
    static TASK = 'producer-new-task-ready';
    static START = 'producer-start-working';
    static STOP = 'producer-stop-working';
}

export class BALANCER_COMMAND_TYPE {
    static STARTED = 'balancer-has-started';
}
