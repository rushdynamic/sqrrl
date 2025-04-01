type NonMutatingAction<State> = (state: State) => Partial<State>;
type MutatingAction<State> = (state: State) => void;
export type Selector<State, Result> = (state: State) => Result;
export type Listener = () => void;
export type SetState<State> = (nonMutatingAction: NonMutatingAction<State>) => void;
export type UpdateState<State> = (mutatingAction: MutatingAction<State>) => void;
export type Initializer<State> = (
    setState: SetState<State>,
    updateState: UpdateState<State>
) => State;
export type DebugFn<State> = (next: State, prev?: State, updated?: Partial<State>) => void;
export type Changed = { status: boolean };
export type GetProxyWithStatus = <State>(state: State) => {
    proxyState: State;
    changed: Changed;
};
