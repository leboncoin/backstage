/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { render } from '@testing-library/react';

import {
  mockCalverProject,
  mockNextGitHubInfoSemver,
  mockReleaseBranch,
  mockReleaseCandidateCalver,
  mockReleaseVersionCalver,
  mockSemverProject,
} from '../../test-helpers/test-helpers';
import { TEST_IDS } from '../../test-helpers/test-ids';
import { useCreateRc } from './hooks/useCreateRc';

jest.mock('../../contexts/ProjectContext', () => ({
  useProjectContext: jest.fn(() => ({
    project: mockCalverProject,
  })),
}));
jest.mock('../../helpers/getRcGitHubInfo', () => ({
  getRcGitHubInfo: () => mockNextGitHubInfoSemver,
}));
jest.mock('./hooks/useCreateRc', () => ({
  useCreateRc: () =>
    ({
      run: jest.fn(),
      responseSteps: [],
      progress: 0,
      runInvoked: false,
    } as ReturnType<typeof useCreateRc>),
}));

import { useProjectContext } from '../../contexts/ProjectContext';
import { CreateRc } from './CreateRc';

describe('CreateRc', () => {
  it('should display CTA', () => {
    const { getByTestId } = render(
      <CreateRc
        defaultBranch="mockDefaultBranch"
        latestRelease={mockReleaseCandidateCalver}
        releaseBranch={mockReleaseBranch}
      />,
    );

    expect(getByTestId(TEST_IDS.createRc.cta)).toBeInTheDocument();
  });

  it('should display select element for semver', () => {
    (useProjectContext as jest.Mock).mockReturnValue({
      project: mockSemverProject,
    });

    const { getByTestId } = render(
      <CreateRc
        defaultBranch="mockDefaultBranch"
        latestRelease={mockReleaseVersionCalver}
        releaseBranch={mockReleaseBranch}
      />,
    );

    expect(getByTestId(TEST_IDS.createRc.semverSelect)).toBeInTheDocument();
  });
});
