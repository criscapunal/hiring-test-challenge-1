import {MigrationInterface, QueryRunner} from "typeorm";

export class warehouse1649472797539 implements MigrationInterface {
    name = 'warehouse1649472797539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "warehouse_event_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" text NOT NULL, CONSTRAINT "PK_e4d12e9f15c60b910134ff68407" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" jsonb NOT NULL, "created_at" NOT NULL, "has_been_processed" boolean NOT NULL, "warehouse_id" uuid NOT NULL, "warehouse_event_type_id" uuid NOT NULL, CONSTRAINT "PK_ac5fade2beca8b29bf3483dfd9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "warehouse" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL, CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "warehouse_event" ADD CONSTRAINT "FK_cec9d2291e75e48ba6dcec0de7b" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse_event" ADD CONSTRAINT "FK_332470d485e23ce06e487ed86cc" FOREIGN KEY ("warehouse_event_type_id") REFERENCES "warehouse_event_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "warehouse_event" DROP CONSTRAINT "FK_332470d485e23ce06e487ed86cc"`);
        await queryRunner.query(`ALTER TABLE "warehouse_event" DROP CONSTRAINT "FK_cec9d2291e75e48ba6dcec0de7b"`);
        await queryRunner.query(`DROP TABLE "warehouse"`);
        await queryRunner.query(`DROP TABLE "warehouse_event"`);
        await queryRunner.query(`DROP TABLE "warehouse_event_type"`);
    }

}
