/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ViewState = 'home' | 'login' | 'admin';

export interface GarfieldDetailCard {
  id: string;
  emoji: string;
  title: string;
  description: string;
}
