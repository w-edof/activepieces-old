import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { BuilderActions } from '../builder.action';
import { canvasActions } from './canvas.action';
import { EMPTY, of } from 'rxjs';
import { BuilderSelectors } from '../builder.selector';
import { LeftSideBarType, RightSideBarType } from '../../../model';
import { RunDetailsService } from '../../../service/run-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlowsActions } from '../../flow';
import { FlowRunStatus } from '@activepieces/shared';

@Injectable()
export class CanvasEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private runDetailsService: RunDetailsService,
    private snackbar: MatSnackBar
  ) {}
  loadInitial$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BuilderActions.loadInitial),
      map((action) => {
        return canvasActions.setInitial({
          displayedFlowVersion: action.flow.version,
          run: action.run,
        });
      })
    );
  });
  openRunDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BuilderActions.loadInitial),
      switchMap((action) => {
        if (action.run) {
          return of(
            canvasActions.setLeftSidebar({
              sidebarType: LeftSideBarType.SHOW_RUN,
            })
          );
        }
        return EMPTY;
      })
    );
  });
  clearAddBtnIdOnClosingRightSidebar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(canvasActions.setRightSidebar),
      filter((action) => action.sidebarType === RightSideBarType.NONE),
      switchMap(() => {
        return of(canvasActions.clearAddButtonId());
      })
    );
  });
  clearAddBtnIdOnStepSelection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(canvasActions.selectStepByName),
      switchMap(() => {
        return of(canvasActions.clearAddButtonId());
      })
    );
  });

  removeStepSelection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(canvasActions.setRightSidebar),
      switchMap((action) => {
        if (action.deselectCurrentStep) {
          return of(canvasActions.deselectStep());
        }
        return EMPTY;
      })
    );
  });
  exitRun$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(canvasActions.exitRun),
        tap(() => {
          this.snackbar.dismiss();
        })
      );
    },
    { dispatch: false }
  );
  openLeftSideBarToShowRun$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(canvasActions.setRun),
      concatLatestFrom(() => [
        this.store.select(BuilderSelectors.selectCurrentFlowRun),
      ]),
      tap(([{ run }, currentRun]) => {
        if (run.id !== currentRun?.id) {
          this.runDetailsService.currentStepResult$.next(undefined);
        }
      }),
      switchMap(() => {
        return of(
          canvasActions.setLeftSidebar({
            sidebarType: LeftSideBarType.SHOW_RUN,
          })
        );
      })
    );
  });

  selectTriggerOnTestRunEnd$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(canvasActions.setRun),
      switchMap(({ run }) => {
        if (run.status !== FlowRunStatus.RUNNING) {
          return of(canvasActions.selectStepByName({ stepName: 'trigger' }));
        }
        return EMPTY;
      })
    );
  });

  selectTriggerOnViewingRun$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(canvasActions.viewRun),
      switchMap(() => {
        return of(canvasActions.selectStepByName({ stepName: 'trigger' }));
      })
    );
  });

  selectTriggerOnOpeningBuilder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(canvasActions.setInitial),
      switchMap(({ run }) => {
        if (run) {
          return of(canvasActions.selectStepByName({ stepName: 'trigger' }));
        }
        return of(FlowsActions.selectFirstInvalidStep());
      })
    );
  });
}
