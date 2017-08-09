using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TestePratico.Models;
using System.Web.Http.Cors;

namespace TestePratico.Controllers
{
    public class CADASTRO_CLIENTEController : ApiController
    {
        private TESTEPRATICOEntities db;

        public CADASTRO_CLIENTEController()
        {
            this.db = new TESTEPRATICOEntities();
        }

        // GET: api/CADASTRO_CLIENTE
        public IQueryable<CADASTRO_CLIENTES> Get()
        {
            return db.CADASTRO_CLIENTES;
        }

        // GET: api/CADASTRO_CLIENTE/5
        [ResponseType(typeof(CADASTRO_CLIENTES))]
        public IHttpActionResult Get(int id)
        {
            CADASTRO_CLIENTES cADASTRO_CLIENTE = db.CADASTRO_CLIENTES.Find(id);
            if (cADASTRO_CLIENTE == null)
            {
                return NotFound();
            }

            return Ok(cADASTRO_CLIENTE);
        }

        // PUT: api/CADASTRO_CLIENTE/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Put(int id, CADASTRO_CLIENTES cADASTRO_CLIENTE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cADASTRO_CLIENTE.ID)
            {
                return BadRequest();
            }

            db.Entry(cADASTRO_CLIENTE).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CADASTRO_CLIENTEExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CADASTRO_CLIENTE
        //[Route("api/CADASTRO_CLIENTE/post/")]
        //[HttpPost]
        [ResponseType(typeof(CADASTRO_CLIENTES))]
        public IHttpActionResult Post( CADASTRO_CLIENTES cADASTRO_CLIENTE)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CADASTRO_CLIENTES.Add(cADASTRO_CLIENTE);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cADASTRO_CLIENTE.ID }, cADASTRO_CLIENTE);
        }

        // DELETE: api/CADASTRO_CLIENTE/5
        [ResponseType(typeof(CADASTRO_CLIENTES))]
        public IHttpActionResult Delete(int id)
        {
            CADASTRO_CLIENTES cADASTRO_CLIENTE = db.CADASTRO_CLIENTES.Find(id);
            if (cADASTRO_CLIENTE == null)
            {
                return NotFound();
            }

            db.CADASTRO_CLIENTES.Remove(cADASTRO_CLIENTE);
            db.SaveChanges();

            return Ok(cADASTRO_CLIENTE);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CADASTRO_CLIENTEExists(int id)
        {
            return db.CADASTRO_CLIENTES.Count(e => e.ID == id) > 0;
        }
    }
}