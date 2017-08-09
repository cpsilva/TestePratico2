using TestePratico.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Central_Cadastro_Clientes.DAO
{
    public class CadastroDAO
    {
        private TESTEPRATICOEntities context;

        public CadastroDAO()
        {

            this.context = new TESTEPRATICOEntities();

        }

        public IEnumerable<CADASTRO_CLIENTES> BuscaTodos()
        {
            var cliente = from c in context.CADASTRO_CLIENTES orderby c.NOME select c;

            return cliente;
        }

        public CADASTRO_CLIENTES Busca(int index)
        {
            CADASTRO_CLIENTES cliente = new CADASTRO_CLIENTES();

            cliente = context.CADASTRO_CLIENTES.Find(index);

            return cliente;
        }
    }
}