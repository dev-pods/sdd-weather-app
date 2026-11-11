import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '../../src/components/SearchBar';

describe('SearchBar', () => {
  it('não dispara busca com input vazio', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    await userEvent.click(screen.getByRole('button', { name: /buscar/i }));
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('dispara busca com o termo digitado', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    await userEvent.type(screen.getByLabelText(/buscar cidade/i), 'Lisboa');
    await userEvent.click(screen.getByRole('button', { name: /buscar/i }));
    expect(onSearch).toHaveBeenCalledWith('Lisboa');
  });

  it('não envia o formulário enquanto a busca está desabilitada', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} disabled />);

    await user.type(screen.getByLabelText(/buscar cidade/i), 'Lisboa');
    fireEvent.submit(screen.getByRole('search'));
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('não dispara busca contendo apenas espaços', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    await user.type(screen.getByLabelText(/buscar cidade/i), '   ');
    expect(screen.getByRole('button', { name: /buscar/i })).toBeDisabled();
    await user.keyboard('{Enter}');
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('envia nomes acentuados sem espaços nas extremidades', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    await user.type(screen.getByLabelText(/buscar cidade/i), '  São Paulo  ');
    await user.click(screen.getByRole('button', { name: /buscar/i }));
    expect(onSearch).toHaveBeenCalledWith('São Paulo');
  });
});
