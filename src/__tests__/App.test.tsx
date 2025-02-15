import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { MemoryRouter } from 'react-router-dom';

test('메인 화면에 로그인 링크가 있나요?', async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const loginLink = screen.getByRole('link', { name: '로그인' });
  expect(loginLink).toBeTruthy();
});

test('메인 화면에 마이페이지 링크가 있나요?', async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const mypageLink = screen.getByRole('link', { name: '마이페이지' });
  expect(mypageLink).toBeTruthy();
});


