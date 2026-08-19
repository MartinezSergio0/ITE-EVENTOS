import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { EventosModule } from './eventos/eventos.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [PrismaModule, InscripcionesModule, EventosModule, SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
