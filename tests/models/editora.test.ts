describe('Testando o modelo Editora', () => {
    const objetoEditora = {
        nome: 'CDC', cidade: 'Sao Paulo', email: 'c@c.com',
    };

    it('Deve instanciar uma nova editora', () => {
        const editora = new Editora(objetoEditora);
        expect(editora).toEqual(
            expect.objectContaining(objetoEditora),
        );
    });
});